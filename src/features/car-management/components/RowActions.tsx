"use client";

import { FaEye } from "react-icons/fa";
import { MdEdit, MdDelete } from "react-icons/md";
import { Button } from "@/components/ui/button"
import {
    TooltipProvider,
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip"

interface RowActionsProps {
  id: number;
  onView?: (id: number) => void;
  onEdit?: (id: number) => void;
  onDelete?: (id: number) => void;
}

export default function RowActions({
  id,
  onView,
  onEdit,
  onDelete,
}: RowActionsProps) {
  return (
    <div className="flex items-center justify-end gap-2 w-fit">
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    <Button
                        size="icon"
                        onClick={() => onView?.(id)}
                        aria-label="Visualizar"
                        className="cursor-pointer bg-blue-500 hover:bg-blue-600"
                    >
                        <FaEye />
                    </Button>
                </TooltipTrigger>

                <TooltipContent>
                    <p>Visualizar</p>
                </TooltipContent>
            </Tooltip>
               
            <Tooltip>
                <TooltipTrigger asChild>
                    <Button
                        size="icon"
                        onClick={() => onEdit?.(id)}
                        aria-label="Editar"
                        className="cursor-pointer bg-yellow-500 hover:bg-amber-600"
                    >
                        <MdEdit />
                    </Button>
                </TooltipTrigger>

                <TooltipContent>
                    <p>Editar</p>
                </TooltipContent>
            </Tooltip>
           
            <Tooltip>
                <TooltipTrigger asChild>
                    <Button
                        size="icon"
                        onClick={() => onDelete?.(id)}
                        aria-label="Excluir"
                        className="cursor-pointer"
                    >
                        <MdDelete />
                    </Button>
                </TooltipTrigger>

                <TooltipContent>
                    <p>Excluir</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    </div>
  );
}
