import "./History.css";

function History({ history }) {
  return (
    <div className="history">

      <div className="history-header">
        <h3>History</h3>
      </div>

      {history.length===0 ? (

        <p>No Calculations</p>

      ) : (

        history.map((item,index)=>(
            <p key={index}>{item}</p>
        ))

      )}

    </div>
  );
}

export default History;