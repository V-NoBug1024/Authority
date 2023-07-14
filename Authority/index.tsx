import * as React from "react";
import * as qs from "query-string";
import BroswerHistory from "@utils/history";
import { getUserInfo } from "../../services";
import { setDefaultParameters } from "@utils/request";

const { useEffect } = React;
export default () => {
  useEffect(() => {
    const params = qs.parse(window.location.search);
    let url: any;
    const { code, msgid } = params;
    ({ url } = params);
    // BroswerHistory.replace(`${url}?msgid=${msgid}`);

    getUserInfo(code).then((res: any) => {
      const { digest, token, userId } = res;
      localStorage.setItem("digest", digest);
      localStorage.setItem("token", token);
      localStorage.setItem("userId", userId);
      setDefaultParameters({
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          token: token,
          digest: digest,
        },
      });
      BroswerHistory.replace(`${url}?msgid=${msgid}`);
    });
  }, []);

  return <>...</>;
};
