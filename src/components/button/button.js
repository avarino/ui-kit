import { jsx as _jsx } from "react/jsx-runtime";
export function Button({ children, ...props }) {
    return (_jsx("button", { ...props, className: "px-5 py-3 cursor-pointer text-white bg-blue-600 rounded-lg", children: children }));
}
