import React, { useMemo } from "react";
import { useLocation, useHistory } from "react-router-dom";

import { useAuth } from '../../hooks/auth'

function useQuery() {
  const { search } = useLocation();
  const encodeSearch = encodeURI(search)
  return useMemo(() => new URLSearchParams(search), [search]);
}

export const RecoverEmail = () => {
  const auth = useAuth();
  const history = useHistory();
  let query = useQuery();

  const token = query.get("token")
  const userId = query.get("userId")
  const email = query.get("email")


  const recoverEmail = async () => {
    await auth.recoverEmail(token, userId, email)
    .then(res => {
      history.push('/profile')
    })
  }
  recoverEmail()

  return null
};
