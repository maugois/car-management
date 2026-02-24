"use client"

import { useTranslations } from 'next-intl';
import { Field, FieldLabel } from "@/components/ui/field"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface PaginationProps {
    totalElements: number;
    currentPage: number;
    pageSize: string;
    onPageChange: (page: number) => void;
    onSizeChange: (size: string) => void;
}

export default function PaginationDataTable({ totalElements, currentPage, pageSize, onPageChange, onSizeChange }: PaginationProps) {
    const t = useTranslations("Dashboard");

    const size = Number(pageSize);
    const totalPages = Math.ceil(totalElements / size);
    
    const startItem = totalElements === 0 ? 0 : currentPage * size + 1;
    const endItem = Math.min((currentPage + 1) * size, totalElements);

    return (
        <div className="w-full flex flex-col md:flex-row items-center justify-between gap-5">
            <Field orientation="horizontal" className="flex flex-col sm:flex-row gap-10 w-fit">
                <p className="font-semibold text-foreground text-sm">
                    {t('paginationShowing', { start: startItem, end: endItem, total: totalElements })}
                </p>

                <FieldLabel htmlFor="select-rows-per-page">{t('paginationPage')}</FieldLabel>
                <Select value={pageSize} onValueChange={onSizeChange}>
                    <SelectTrigger className="w-20" id="select-rows-per-page">
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent align="start">
                        <SelectGroup>
                            <SelectItem value="10">10</SelectItem>
                            <SelectItem value="25">25</SelectItem>
                            <SelectItem value="50">50</SelectItem>
                            <SelectItem value="100">100</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </Field>

            <Pagination className="md:justify-end">
                <PaginationContent>
                    <PaginationItem>
                        <PaginationPrevious 
                            className={currentPage === 0 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                            onClick={(e) => {
                                e.preventDefault();
                                if (currentPage > 0) onPageChange(currentPage - 1);
                            }} 
                        />
                    </PaginationItem>

                    <PaginationItem>
                        <PaginationLink isActive className="cursor-default">
                            {currentPage + 1}
                        </PaginationLink>
                    </PaginationItem>
                    
                    <PaginationItem>
                        <PaginationEllipsis />
                    </PaginationItem>
                    
                    <PaginationItem>
                        <PaginationNext 
                            className={(currentPage + 1) >= totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                            onClick={(e) => {
                                e.preventDefault();
                                if ((currentPage + 1) < totalPages) onPageChange(currentPage + 1);
                            }} 
                        />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </div>
    )
}