import { Table } from "@mantine/core";
import ResponsiveAppBar from "../components/Navbar";
import firebase from "../utils/firebase";
import db from "../utils/firebase";

export default function dashboard() {
  const [input,setInput] = useState('');
  const [users, setUsers] = useState([]);

  useEffect(()=>{
    db.collection('Users').onSnapshot(snapshot =>{
      setUsers(snapshot.doc.map(doc=>({SrNo:doc.data().SrNo, name: doc.data().Name, url:doc.data().url, desc:doc.data().description, status:doc.data().status, lastres:doc.data().lastResponse})))
    })
  },[]);
  // const elements = [
  //   { SrNo: 1, url: 12.011, status: "Active", name: "Neelansh", desc: "User", lastres: "12/2/21-9.30" },
  //   { SrNo: 2, url: 14.007, status: "Inactive", name: "Nishit", desc: "Bob's Computer", lastres: "12/2/21-9.30" },
  //   { SrNo: 3, url: 88.906, status: "Active", name: "Raj", desc: "User", lastres: "12/2/21-9.30" },
  //   { SrNo: 4, url: 137.33, status: "Active", name: "Manan", desc: "File", lastres: "12/2/21-9.30" },
  //   { SrNo: 5, url: 140.12, status: "Inactive", name: "Jayesh", desc: "File", lastres: "12/2/21-9.30" },
  // ];

  const rows = elements.map((element) => (
    <tr key={element.SrNo}>
      <td>{element.SrNo}</td>
      <td>{element.name}</td>
      <td>{element.url}</td>
      <td>{element.desc}</td>
      <td>{element.status}</td>
      <td>{element.lastres}</td>
    </tr>
  ));

  return (
    <div>
      <ResponsiveAppBar />
      <div className="container" style={{ marginTop: "30px" }}>
        <Table>
          <thead>
            <tr>
              <th>Sr No</th>
              <th>Name</th>
              <th>Url</th>
              <th>Description</th>
              <th>Status</th>
              <th>Last Response</th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </Table>
      </div>
    </div>
  );
}
