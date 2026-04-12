import Styles from "../../styles/global.module.css";

function ContactCard(prop) {

  return (
    <>
      <div className="d-flex mb-4" role="button">
        <div className={`bg-primary flex-shrink-0 rounded-circle text-white ${Styles.profileImage}`}>{prop.username[0]}</div>
        <div className="ms-2 mt-1 text-primary" style={{width: "200px"}}>
          <div className="text-truncate">{prop.username}</div>
          <div className="text-secondary text-truncate p-0 m-0" style={{fontSize: "12px", fontWeight: "100"}}>{prop.lastMessage}</div>
        </div>
        <div className="ms-auto mt-2">
          <div className="text-secondary" style={{fontSize: "9px", fontWeight: "100"}}>{prop.lastUpdated}</div>
          {typeof prop.indicator === "number" && prop.indicator > 0 && (
            <div className="ms-auto mt-2 bg-primary rounded-circle d-flex justify-content-center align-items-center text-white" style={{width: "12px", height: "12px", fontSize: "8px"}}>
              {prop.indicator}
            </div>
          )}
          {typeof prop.indicator === "string" && (
            <div className="ms-auto mt-2 rounded-circle d-flex justify-content-center align-items-center text-primary" style={{width: "12px", height: "12px", fontSize: "8px"}}>
              {prop.indicator}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default ContactCard;
