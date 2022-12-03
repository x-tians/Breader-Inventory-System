import DashboardFooter from '../component/DashboardFooter'
import DashboardHeader from '../component/DashboardHeader';
import Profile from '../component/DashboardProfile';
import DashboardLeftSection from '../component/DashboardLeftSection';

const DashboardCashierPage=()=>{
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
                     <Profile/>
                </div>
                <div>
                    <DashboardFooter/>
                </div>
            </div>
            
        </div>
    )
}

export default DashboardCashierPage;