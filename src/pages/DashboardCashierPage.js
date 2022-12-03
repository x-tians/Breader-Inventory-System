import DashboardFooter from '../component/DashboardFooter'
import DashboardHeader from '../component/DashboardHeader';
import DashboardLeftSection from '../component/DashboardLeftSection';
import DashboardCashier from '../component/DashboardCashier'

const DashboardCashierPage=()=>{

    const rightSection='DashboardAddProduct';
    return(
        <div className='dashboard-user grid vh-100'>
            <div>
                <DashboardLeftSection/>
            </div>
            <div className='grid vh-100 dashboard-content'>
                <div>
                    <DashboardHeader/>
                </div>
                <div>
                     <DashboardCashier/>
                </div>
                <div>
                    <DashboardFooter/>
                </div>
            </div>
            
        </div>
    )
}

export default DashboardCashierPage;