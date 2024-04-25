'use client'
import React, { useState, useEffect } from 'react';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Button, Link } from '@nextui-org/react';
import columnsData from './columns';
import { getAllCourses } from '@/lib/actions/course/get-all-course';

const DataTable = () => {
  const [rows, setRows] = useState([]);
  const [selectedKeys, setSelectedKeys] = useState(new Set());
  const [sortDirection, setSortDirection] = useState({});
  const [activeSortKey, setActiveSortKey] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllCourses();
        const formattedData = data.map((item, index) => ({
          id: item.id,
          key: `${index + 1}`,
          title: item.title,
          price: item.price,
          publish: item.publish ? 'Active' : 'Paused',
        }));
        setRows(formattedData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleSelectionChange = (keys) => {
    setSelectedKeys(keys);
  };

  const handleSort = (key) => {
    let direction = 'asc';
    if (activeSortKey === key && sortDirection[key] === 'asc') {
      direction = 'desc';
    }
    setSortDirection({ [key]: direction });
    setActiveSortKey(key);

    const sortedRows = [...rows].sort((a, b) => {
      if (direction === 'asc') {
        return a[key].localeCompare(b[key]);
      } else {
        return b[key].localeCompare(a[key]);
      }
    });
    setRows(sortedRows);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = rows.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(rows.length / itemsPerPage);

  const handlePageChange = (action) => {
    if (action === 'next' && currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    } else if (action === 'prev' && currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  return (
    <>
      <div className='space-x-4 max-w-screen-2xl mx-auto'>
        <Button onClick={() => handleSort('title')}>
          Sort by Title {sortDirection.title === 'asc' ? '▲' : '▼'}
        </Button>
        <Button onClick={() => handleSort('price')}>
          Sort by Price {sortDirection.price === 'asc' ? '▲' : '▼'}
        </Button>
        <Button onClick={() => handleSort('publish')}>
          Sort by Publish {sortDirection.publish === 'asc' ? '▲' : '▼'}
        </Button>
      </div>

      <Table
        className='max-w-screen-2xl mx-auto'
        aria-label="Controlled table example with dynamic content"
        selectionMode="multiple"
        selectedKeys={selectedKeys}
        onSelectionChange={handleSelectionChange}
      >
        <TableHeader columns={columnsData}>
          {(column) => (
            <TableColumn key={column.key}>
              {column.label}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody>
          {currentItems.map((row) => (
            <TableRow key={row.key}>
              <TableCell>
                <Link href={`/course/${row.id}`} underline>
                  {row.title}
                </Link>
              </TableCell>
              <TableCell>{row.price}</TableCell>
              <TableCell>{row.publish}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="max-w-screen-2xl mx-auto space-x-6 flex justify-end mt-4">
        <Button onClick={() => handlePageChange('prev')} disabled={currentPage === 1}>
          Previous
        </Button>
        <span>{`Page ${currentPage} of ${totalPages}`}</span>
        <Button onClick={() => handlePageChange('next')} disabled={currentPage === totalPages}>
          Next
        </Button>
      </div>
    </>
  );
};

export default DataTable;
