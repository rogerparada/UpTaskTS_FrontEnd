import { PropsWithChildren } from "react";

export default function ErrorMessage({ children }: PropsWithChildren) {
	return <div className="text-red-600 font-bold p-3 uppercase text-sm text-center my-4 bg-red-100">{children}</div>;
}
