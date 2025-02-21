import { DataTableRoot } from './DataTableRoot';
import { DataTableHeader } from './DataTableHeader';
import { DataTableLabel } from './DataTableLabel';
import { DataTableActions } from './DataTableActions';
import { DataTableSearch } from './DataTableSearch';
import { DataTableContent, ColumnProps } from './DataTableContent';
import { DataTableFooter } from './DataTableFooter';
import { DataTableRowsCount } from './DataTableRowsCount';
import { DataTablePagination } from './DataTablePagination';
import { DataTablePageSizeControl } from './DataTablePageSizeControl';
import { DataTablePageCount } from './DataTablePageCount';
import { DataTableFooterSection } from './DataTableFooterSection';

export const DataTable = {
  Root: DataTableRoot,
  Header: DataTableHeader,
  Label: DataTableLabel,
  Actions: DataTableActions,
  Search: DataTableSearch,
  Content: DataTableContent,
  Footer: DataTableFooter,
  FooterSection: DataTableFooterSection,
  RowsCount: DataTableRowsCount,
  PageCount: DataTablePageCount,
  Pagination: DataTablePagination,
  PageSizeControl: DataTablePageSizeControl,
};

export type { ColumnProps };
