import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { TaskFormData } from "@/types/index";
import { createTask } from "@/api/TaskAPI";
import TaskForm from "./TaskForm";

export default function AddTaskModal() {
	const navigate = useNavigate();
	const location = useLocation();
	const queryParams = new URLSearchParams(location.search);
	const modalTask = queryParams.get("newTask");
	const show = modalTask ? true : false;

	const params = useParams();
	const projectId = params.projectId!;

	const queryClient = useQueryClient();
	const { mutate } = useMutation({
		mutationFn: createTask,
		onError: (error) => {
			toast.error(error.message);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["editProject", projectId] });
			toast.success("Task created");
			reset();
			navigate(location.pathname, { replace: true });
		},
	});

	const initialValues: TaskFormData = {
		name: "",
		description: "",
	};

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm({ defaultValues: initialValues });

	const handleCreateData = (formData: TaskFormData) => {
		const data = {
			formData,
			projectId,
		};
		mutate(data);
	};

	return (
		<>
			<Transition appear show={show} as={Fragment}>
				<Dialog as="div" className="relative z-10" onClose={() => navigate(location.pathname, { replace: true })}>
					<Transition.Child
						as={Fragment}
						enter="ease-out duration-300"
						enterFrom="opacity-0"
						enterTo="opacity-100"
						leave="ease-in duration-200"
						leaveFrom="opacity-100"
						leaveTo="opacity-0"
					>
						<div className="fixed inset-0 bg-black/60" />
					</Transition.Child>

					<div className="fixed inset-0 overflow-y-auto">
						<div className="flex min-h-full items-center justify-center p-4 text-center">
							<Transition.Child
								as={Fragment}
								enter="ease-out duration-300"
								enterFrom="opacity-0 scale-95"
								enterTo="opacity-100 scale-100"
								leave="ease-in duration-200"
								leaveFrom="opacity-100 scale-100"
								leaveTo="opacity-0 scale-95"
							>
								<Dialog.Panel className="w-full max-w-4xl transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all p-16">
									<Dialog.Title as="h3" className="font-black text-4xl  my-5">
										New Task
									</Dialog.Title>

									<p className="text-xl font-bold">
										Fill out the form and create a new&nbsp;
										<span className="text-sky-600">task</span>
									</p>

									<form className="mt-10 space-y-3" noValidate onSubmit={handleSubmit(handleCreateData)}>
										<TaskForm errors={errors} register={register} />
										<input
											type="submit"
											value="Create Task"
											className="bg-sky-400 hover:bg-sky-600 transition-colors w-full p-3 text-white uppercase font-bold cursor-pointer"
										/>
									</form>
								</Dialog.Panel>
							</Transition.Child>
						</div>
					</div>
				</Dialog>
			</Transition>
		</>
	);
}
