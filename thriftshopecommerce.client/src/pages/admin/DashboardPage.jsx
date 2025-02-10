import { FaPesoSign, FaUser, FaArrowTrendUp, FaBagShopping } from 'react-icons/fa6';
import LineChart from '../../components/charts/LineChart';
import PieChart from '../../components/charts/PieChart';

function DashboardPage() {
  return (
    <>
      {/* Header */}
      <div className='fw-normal lh-sm'>
        <p className='fs-1 m-0'>Dashboard</p>
        <p className='fs-5 text-black-50'>Welcome to your Thrift Shop Management System</p>
      </div>

      {/* Overviews */}
      <div className='row row-cols-2 row-cols-lg-4'>
        {/* Revenue */}
        <div className='col'>
          <div className='border shadow-sm p-3 rounded-2 h-100'>
            <div className='d-flex justify-content-between'>
              <p className='fw-semibold m-0'>Total Revenue</p>
              <FaPesoSign className='text-black-50' />
            </div>
            <p className='m-0 fs-3 fw-bold'>₱5456.00</p>
            <small className='text-black-50 m-0'>+20.1% from last month</small>
          </div>
        </div>

        {/* Accounts */}
        <div className='col'>
          <div className='border shadow-sm p-3 rounded-2 h-100'>
            <div className='d-flex justify-content-between'>
              <p className='fw-semibold m-0'>Active Accounts</p>
              <FaUser className='text-black-50' />
            </div>
            <p className='m-0 fs-3 fw-bold'>4</p>
            <small className='text-black-50 m-0'>Total Accounts: 24</small>
          </div>
        </div>

        {/* Item Listed */}
        <div className='col'>
          <div className='border shadow-sm p-3 rounded-2 h-100'>
            <div className='d-flex justify-content-between'>
              <p className='fw-semibold m-0'>Item Listed</p>
              <FaBagShopping className='text-black-50' />
            </div>
            <p className='m-0 fs-3 fw-bold'>+54</p>
            <small className='text-black-50 m-0'>Total Item Listed: 54</small>
          </div>
        </div>

        {/* Total Orders */}
        <div className='col'>
          <div className='border shadow-sm p-3 rounded-2 h-100'>
            <div className='d-flex justify-content-between'>
              <p className='fw-semibold m-0'>Active Orders</p>
              <FaArrowTrendUp className='text-black-50' />
            </div>
            <p className='m-0 fs-3 fw-bold'>+4</p>
            <small className='text-black-50 m-0'>Total Orders: 62</small>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className='row gap-3 mt-3'>
        <div className='col'>
          <LineChart />
        </div>

        <div className='col'>
          <PieChart />
        </div>
      </div>
    </>
  )
}

export default DashboardPage