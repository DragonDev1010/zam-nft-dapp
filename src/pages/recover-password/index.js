import React, { useMemo } from "react";
import { useLocation } from "react-router-dom";
import { RecoverBody } from "./body";

function useQuery() {
  const { search } = useLocation();
  const encodeSearch = encodeURI(search)
  return useMemo(() => new URLSearchParams(search), [search]);
}

export const RecoverPassword = () => {
  let query = useQuery();
  const token = query.get("token")
  const userId = query.get("userId")

  return (
    <div className="recover-wrapper">
      <div className="recover-title">Recover Password</div>
      <RecoverBody token={token} userId={userId}/>
    </div>
  );
};
