import React, { useState } from "react";
import {
  DataGrid,
  gridPaginatedVisibleSortedGridRowIdsSelector,
  gridSortedRowIdsSelector,
  GridToolbarContainer,
  gridVisibleSortedRowIdsSelector,
  useGridApiContext,
  GridLinkOperator,
  GridToolbarQuickFilter,
  GridToolbar,
} from "@mui/x-data-grid";
import { Box, Paper } from "@mui/material";

const DataTable = ({
  rows,
  columns,
  loading,
  sx,
  className,
  rowHeight,
  checkboxSelection,
}) => {
  const [pageSize, setPageSize] = useState(10);

  return (
    <Paper
      sx={{
        backgroundColor: "#F7F7F7",
        border: 0,
        borderTop: 0,
        borderRadius: 0,
      }}
      elevation={0}
    >
      <DataGrid
        rows={rows}
        rowHeight={70}
        columns={columns}
        loading={loading}
        sx={sx}
        className={className}
        checkboxSelection={checkboxSelection}
        pagination
        pageSize={pageSize}
        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
        rowsPerPageOptions={[10, 20, 30]}
        components={{ Toolbar: GridToolbar }}
        componentsProps={{
          toolbar: {
            showQuickFilter: true,
            quickFilterProps: { debounceMs: 500 },
          },
        }}
      />
    </Paper>
  );
};

export default DataTable;
