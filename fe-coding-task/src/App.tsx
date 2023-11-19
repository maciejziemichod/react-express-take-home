import { Chart } from "./components/Chart";
import { Form } from "./components/Form";
import { Sidebar } from "./components/Sidebar";
import { Comment } from "./components/Comment";

export default function App() {
    return (
        <main>
            <Sidebar />
            <Form />
            <Chart />
            <Comment />
        </main>
    );
}
