import { MoreHorizontal, Eye } from "lucide-react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { useNavigate } from "react-router-dom";

const IncidentActions = ({ incident }) => {

const navigate = useNavigate();

   const handleView = () => {

        navigate(`/incidents/${incident._id}`);

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
                    align="end"
                    className="z-50 w-56 rounded-xl border border-border bg-surface p-2 shadow-2xl"
                >

                    <DropdownMenu.Item
                        onClick={handleView}
                        className="flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium outline-none transition hover:bg-background focus:bg-background"
                    >

                        <Eye size={17} />

                        View Incident

                    </DropdownMenu.Item>

                </DropdownMenu.Content>

            </DropdownMenu.Portal>

        </DropdownMenu.Root>

    );

};

export default IncidentActions;