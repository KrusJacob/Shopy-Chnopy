import { UserApi } from "@/shared/api/user";

import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

const useUser = () => {
  const session = useSession();
  const userId = session.data?.user?.id;

  const { data: currentUser, isSuccess } = useQuery({
    queryFn: () => UserApi.getUser(userId!),
    queryKey: ["user", userId],
    enabled: !!userId,
  });

  return { currentUser, isSuccess };
};

export default useUser;
