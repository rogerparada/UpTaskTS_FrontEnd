import { addMemberById } from "@/api/TeamAPI";
import { TeamMember } from "@/types/index";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

type SearchResultProps = {
	user: TeamMember;
	reset: () => void;
};

export default function SearchResult({ user, reset }: SearchResultProps) {
	const navigate = useNavigate();
	const params = useParams();
	const queryClient = useQueryClient();
	const projectId = params.projectId!;

	const { mutate } = useMutation({
		mutationFn: addMemberById,
		onError: (error) => {
			toast.error(error.message);
		},
		onSuccess: (data) => {
			toast.success(data);
			reset();
			navigate(location.pathname, { replace: true });
			queryClient.invalidateQueries({ queryKey: ["projectTeam", projectId] });
		},
	});
	return (
		<>
			<p className="mt-18 text-center font-bold">Result:</p>
			<div className="flex justify-between items-center">
				<p>{user.name}</p>
				<button className="text-blue-600 hover:bg-blue-100 px-10 py-3 font-bold cursor-pointer" onClick={() => mutate({ projectId, id: user._id })}>
					Add to th project
				</button>
			</div>
		</>
	);
}
