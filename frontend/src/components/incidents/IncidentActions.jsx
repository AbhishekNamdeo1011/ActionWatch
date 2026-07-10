import { MoreHorizontal, Eye, Pencil, CheckCircle2, Trash2 } from "lucide-react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { useNavigate } from "react-router-dom";
const IncidentActions = ({ incident }) => {
const navigate = useNavigate();
   const handleView = () => {

    navigate(

        `/incidents/${incident._id}`

    );

};

    const handleEdit = () => {
        console.log("Edit", incident._id);
    };

    const handleResolve = () => {
        console.log("Resolve", incident._id);
    };

    const handleDelete = () => {
        console.log("Delete", incident._id);
    };

    return (

        <DropdownMenu.Root>

            <DropdownMenu.Trigger asChild>

                <button className="rounded-lg p-2 transition hover:bg-background">

                    <MoreHorizontal size={18} />

                </button>

            </DropdownMenu.Trigger>

            <DropdownMenu.Portal>

                <DropdownMenu.Content
                    sideOffset={8}
                    className="w-52 rounded-xl border border-border bg-surface p-2 shadow-xl"
                >

                    <DropdownMenu.Item
                        onClick={handleView}
                        className="flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2 text-sm outline-none hover:bg-background"
                    >
                        <Eye size={16} />
                        View Incident
                    </DropdownMenu.Item>

                    <DropdownMenu.Item
                        onClick={handleEdit}
                        className="flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2 text-sm outline-none hover:bg-background"
                    >
                        <Pencil size={16} />
                        Edit Incident
                    </DropdownMenu.Item>

                    <DropdownMenu.Item
                        onClick={handleResolve}
                        className="flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2 text-sm outline-none hover:bg-background"
                    >
                        <CheckCircle2 size={16} />
                        Mark Resolved
                    </DropdownMenu.Item>

                    <DropdownMenu.Separator className="my-2 h-px bg-border" />

                    <DropdownMenu.Item
                        onClick={handleDelete}
                        className="flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2 text-sm text-red-500 outline-none hover:bg-red-500/10"
                    >
                        <Trash2 size={16} />
                        Delete Incident
                    </DropdownMenu.Item>

                </DropdownMenu.Content>

            </DropdownMenu.Portal>

        </DropdownMenu.Root>

    );

};

export default IncidentActions;