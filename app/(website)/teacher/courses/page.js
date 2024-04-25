import React from 'react'
import Link from "next/link"
import {Button} from "@nextui-org/react";

import DataTable from './_components/data-table';

const CoursePage = () => {
  return (
    <section className='p-6'>
      {/* <Link
      href="/teacher/create"
      >
        <Button>
          New Course
        </Button>
      </Link> */}
     <DataTable />
    </section>
  )
}

export default CoursePage