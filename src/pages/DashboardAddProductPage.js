import DashboardFooter from '../component/DashboardFooter'
import DashboardHeader from '../component/DashboardHeader';
import DashboardLeftSection from '../component/DashboardLeftSection';
import DashboardAddProduct from '../component/DashboardAddProduct';

const UserDashboard=()=>{

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
                     <DashboardAddProduct/>
                </div>
                <div>
                    <DashboardFooter/>
                </div>
            </div>
            
        </div>
    )
}

export default UserDashboard;