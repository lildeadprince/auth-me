import { Dispatch, FC, FormEventHandler, useCallback, useMemo } from 'react';
import { Session, useSession } from '~/app/context';
import { ActionType, useAuthFormApi } from '~/routes/login-form/hooks/use-auth-form-api';
import { useRedirectOnPresentSession } from '~/routes/login-form/hooks/use-redirect-on-present session';
import { LoginFormLayout } from '~/routes/login-form/login-form.layout';

export const LoginFormContainer: FC = () => {
  const { session, setSession } = useSession();

  // redirect to proper location as soon as underlying component logic succeed in acquiring a session
  useRedirectOnPresentSession(session);

  // HTML Form <-> submission dispatching <-> data fetching. Quite messy.
  const { handleSubmitForm, isLoading, error } = useHtmlFormForAuthentication(setSession);

  return <LoginFormLayout onSubmit={handleSubmitForm} isLoading={isLoading} error={error} />;
};

function useHtmlFormForAuthentication(onSuccess: Dispatch<Session>) {
  const [isLoading, error, dispatchAuth] = useAuthFormApi(onSuccess, onSuccess);

  const handleSubmitForm = useCallback<FormEventHandler<HTMLFormElement>>(e => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    // I don't remember right now why the bloody "type=submit" values do not appear in FormData despite they have to
    // https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#constructing-form-data-set
    // Therefore, have to play around native event and original target element
    const formAction = ((e.nativeEvent as SubmitEvent).submitter as HTMLButtonElement).value as ActionType;

    dispatchAuth(formAction || 'login', {
      email: (formData.get('email') as string) || '',
      password: (formData.get('password') as string) || '',
    });
  }, []); // dispatch is memo

  return useMemo(() => {
    return { handleSubmitForm, isLoading, error };
  }, [isLoading, error]); // handler is memo
}
