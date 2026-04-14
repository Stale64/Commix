import { Icons } from "../../constants/image-strings";
import Styles from "../../styles/global.module.css";
import ContactCard from "./ContactCard";

function Sidebar(prop) {
    return (
        <>
            <div className={`${Styles.sidebar} p-4 col-3`}>
                <div className="d-flex">
                    <div className={`bg-primary rounded-circle text-white ${Styles.profileImage}`}>{prop.username[0]}</div>
                    <div className="ms-2 mt-1 text-primary">
                        <div>{prop.username}</div>
                        <div className="text-black p-0 m-0" style={{fontSize: "12px"}}>{"Software developer"}</div>
                    </div>
                    <button  data-bs-toggle="modal" data-bs-target="#searchUserModal" className="bg-primary border-0 ms-auto d-flex justify-content-center align-items-center align-self-center rounded-2 p-3 text-white" title="Add contacts" style={{width: "14px", height: "14px"}}>
                        +
                    </button>
                </div>
                <div className="d-flex form-control align-items-center rounded-pill mt-3">
                    <img src={Icons.Search} style={{width: "16px"}} alt=""/>
                    <input className={`border-0 ms-2 ${Styles.searchBar} w-100`} type="search" placeholder="Search Here..."/>
                </div>
                <hr />
                {prop.contacts.map((contact, index) => (
                    <ContactCard
                        key={index}
                        username={contact.username}
                        lastMessage={contact.lastMessage}
                        lastUpdated={contact.lastUpdated}
                        indicator={contact.indicator}
                        onSelect={prop.onContactSelect}
                    />
                ))}

                <div className="modal fade" id="searchUserModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Find User</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                        </div>
                        <div className="modal-body">
                            <input type="search" className="form-control" placeholder="Enter username"/>
                            <div className="d-flex justify-content-center">
                                <button className="btn btn-primary mt-2">Search</button>
                            </div>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Sidebar;