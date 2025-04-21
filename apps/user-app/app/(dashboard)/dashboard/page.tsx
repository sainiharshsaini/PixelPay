import WelcomeCard from "../../../components/dashboard-comp/WelcomeCard"
import { BalanceCard } from "../../../components/dashboard-comp/BalanceCard"

const Dashboard = () => {
    return (
        <div className="w-full flex-col flex items-center">
            <WelcomeCard/>
            <BalanceCard amount={200} locked={300}/>
        </div>
    )
}

export default Dashboard