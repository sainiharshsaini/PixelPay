import WelcomeCard from "./_components/WelcomeCard"
import { BalanceCard } from "./_components/BalanceCard"

const Dashboard = () => {
    return (
        <div className="w-full flex-col flex items-center">
            <WelcomeCard/>
            <BalanceCard amount={200} locked={300}/>
        </div>
    )
}

export default Dashboard