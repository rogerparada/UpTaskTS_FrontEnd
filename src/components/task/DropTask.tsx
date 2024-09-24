import { useDroppable } from "@dnd-kit/core";

type DropTaskProps = {
	status: string;
};

export default function DropTask({ status }: DropTaskProps) {
	const { isOver, setNodeRef } = useDroppable({ id: status });

	const style = {
		opacity: isOver ? 0.4 : undefined,
	};

	return (
		<div ref={setNodeRef} style={style} className="border border-dashed border-slate-700 mt-5 text-center p-2 text-xs uppercase text-slate-400 ">
			Drop task here
		</div>
	);
}
