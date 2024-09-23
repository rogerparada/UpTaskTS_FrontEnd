import { useAuth } from "@/hooks/useAuth";
import { useMemo } from "react";
import { TrashIcon } from "@heroicons/react/20/solid";
import { Note } from "@/types/index";
import { formatDate } from "@/utils/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteNote } from "@/api/NoteAPI";
import { toast } from "react-toastify";
import { useLocation, useParams } from "react-router-dom";

type NoteDetailProps = {
	note: Note;
};

export default function NoteDetail({ note }: NoteDetailProps) {
	const params = useParams();
	const location = useLocation();
	const queryParams = new URLSearchParams(location.search);
	const projectId = params.projectId!;
	const taskId = queryParams.get("viewTask")!;

	const { data, isLoading } = useAuth();
	const canEdit = useMemo(() => data?._id === note.createdBy._id, [data, note]);
	const queryClient = useQueryClient();
	const { mutate } = useMutation({
		mutationFn: deleteNote,
		onError: (error) => {
			toast.error(error.message);
		},
		onSuccess: (data) => {
			toast.success(data);
			queryClient.invalidateQueries({ queryKey: ["task", taskId] });
		},
	});

	if (isLoading) return "Loading...";
	if (data)
		return (
			<div className="p-3 flex justify-between items-center">
				<div>
					<p>
						<span className="font-bold text-sm">By: {note.createdBy.name}</span>
					</p>
					<p>{note.content}</p>
					<p className="text-xs text-slate-500">{formatDate(note.createdAt)}</p>
				</div>
				{canEdit && (
					<button
						className="text-center bg-red-500 hover:bg-red-700 rounded-full w-10 h-10 text-white p-2 transition-colors"
						onClick={() => mutate({ projectId, taskId, noteId: note._id })}
					>
						<TrashIcon />
					</button>
				)}
			</div>
		);
}
