import WelcomeCard from "../../../components/WelcomeCard"
import { BalanceCard } from "../../../components/BalanceCard"

const Dashboard = () => {
    return (
        <div className="w-full flex-col flex items-center">
            <WelcomeCard/>
            <BalanceCard amount={200} locked={300}/>
        </div>
    )
}

export default Dashboard