"use client";
import React, { useMemo, useState } from "react";
import { Button } from "@mui/material";
import { MaterialReactTable } from "material-react-table";

const roles = ["دانشجو", "استاد", "ادمین"];

const initialData = [
  { id: 1, name: "علی رضایی", email: "ali@example.com", role: "دانشجو" },
  { id: 2, name: "سارا محمدی", email: "sara@example.com", role: "استاد" },
  { id: 3, name: "مریم حسینی", email: "maryam@example.com", role: "ادمین" }
];

export default function UserManagement() {
  const [data, setData] = useState(initialData);

  const columns = useMemo(
    () => [
      {
        accessorKey: "name",
        header: "نام و نام خانوادگی"
      },
      {
        accessorKey: "email",
        header: "ایمیل"
      },
      {
        accessorKey: "role",
        header: "نقش",
        muiTableBodyCellEditTextFieldProps: {
          select: true,
          children: roles.map(role =>
            <option key={role} value={role}>
              {role}
            </option>
          )
        }
      }
    ],
    []
  );

  // ویرایش سطر
  const handleSaveRow = (row, updatedValues) => {
    const updatedData = [...data];
    const index = updatedData.findIndex(d => d.id === row.original.id);
    updatedData[index] = { ...updatedData[index], ...updatedValues };
    setData(updatedData);
  };

  // حذف سطر
  const handleDeleteRow = row => {
    if (window.confirm("آیا مطمئن هستید که می‌خواهید این ردیف حذف شود؟")) {
      setData(prev => prev.filter(d => d.id !== row.original.id));
    }
  };

  // اضافه کردن ردیف جدید
  const handleAddRow = () => {
    const newUser = {
      id: Date.now(),
      name: "",
      email: "",
      role: roles[0]
    };
    setData(prev => [newUser, ...prev]);
  };

  return (
    <div
      style={{
        direction: "rtl",
        padding: 20,
        fontFamily: "'Vazir', sans-serif"
      }}
    >
      <Button
        variant="contained"
        color="primary"
        onClick={handleAddRow}
        sx={{ mb: 2 }}
      >
        افزودن کاربر جدید
      </Button>

      <MaterialReactTable
        columns={columns}
        data={data}
        editingMode="row"
        enableEditing
        onEditingRowSave={handleSaveRow}
        muiTableBodyRowProps={({ row }) => ({
          // برای راست‌چین بودن ردیف‌ها
          style: { textAlign: "right" }
        })}
        renderRowActions={({ row, table }) =>
          <Button color="error" onClick={() => handleDeleteRow(row)}>
            حذف
          </Button>}
        localization={{
          toolbar: {
            searchPlaceholder: "جستجو ...",
            searchTooltip: "جستجو",
            showHideColumns: "نمایش/مخفی کردن ستون‌ها"
          },
          pagination: {
            labelRowsPerPage: "تعداد ردیف در هر صفحه",
            labelDisplayedRows: "{from}-{to} از {count}",
            firstTooltip: "صفحه اول",
            previousTooltip: "صفحه قبلی",
            nextTooltip: "صفحه بعدی",
            lastTooltip: "صفحه آخر"
          },
          edit: {
            cancelTooltip: "لغو",
            saveTooltip: "ذخیره",
            editTooltip: "ویرایش"
          },
          grouping: {
            placeholder: "کشیدن ستون برای گروه‌بندی ..."
          },
          filters: {
            filterTooltip: "فیلتر"
          }
        }}
      />
    </div>
  );
}
