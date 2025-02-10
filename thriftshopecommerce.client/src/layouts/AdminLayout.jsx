import { Outlet } from 'react-router-dom'
import Sidebar from '../components/layout/Sidebar'

function AdminLayout() {
  return (
    <>
      <div className='bg-light min-vh-100 d-flex flex-column flex-lg-row p-3 gap-4 text-dark'>
        <Sidebar />

        <div className='container-fluid py-3 px-4 bg-white rounded shadow-sm text-dark'>
          <Outlet />
        </div>
      </div>
    </>
  )
}

export default AdminLayout