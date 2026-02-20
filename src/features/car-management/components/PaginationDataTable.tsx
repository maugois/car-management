import { getTranslations } from 'next-intl/server';
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

export default async function PaginationDataTable() {
    const t = await getTranslations("Dashboard");

    return (
        <div className="w-full flex flex-col md:flex-row items-center justify-between gap-5">
            <Field orientation="horizontal" className="flex flex-col sm:flex-row gap-10 w-fit">
                <p className="text-gray-300 text-sm">
                    {t('paginationShowing')}
                </p>

                <FieldLabel htmlFor="select-rows-per-page">{t('paginationPage')}</FieldLabel>
                <Select defaultValue="25">
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
                        <PaginationPrevious href='#' aria-label={t("previous")} />
                    </PaginationItem>

                    <PaginationItem>
                        <PaginationLink href="#">1</PaginationLink>
                    </PaginationItem>

                    <PaginationItem>
                        <PaginationLink href="#" isActive>
                            2
                        </PaginationLink>
                    </PaginationItem>
                    
                    <PaginationItem>
                        <PaginationLink href="#">3</PaginationLink>
                    </PaginationItem>
                    
                    <PaginationItem>
                        <PaginationEllipsis />
                    </PaginationItem>
                    
                    <PaginationItem>
                        <PaginationNext href="#" aria-label={t("next")} />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </div>
    )
}