import { useQueryClient, useQuery, useMutation } from "@tanstack/react-query";

const HandleTokenReq = () => {
	const queryClient = useQueryClient();

	const getTokens = async () => "";

	const fecth = useQuery({
		queryKey: ["tokens"],
		queryFn: getTokens,
	});

	return <div>HandleTokenReq</div>;
};

export default HandleTokenReq;
