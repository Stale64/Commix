import { Icons } from "../../constants/image-strings";
import { useAuth } from "../../context/AuthContext";
import { useAlert } from "../../context/AlertContext";

function ContactPreview(prop) {

    const { logout } = useAuth();
    const { triggerAlert } = useAlert();

    const logoutHandler = async (event) => {
        event.preventDefault();
        try {
            await logout();
            triggerAlert("Logout successful", "success");
        } catch(error) {
            triggerAlert(error.response?.data?.errorMessage, "danger")
        }
    }

    return (
        <>
            <div className="col-3 d-flex flex-column justify-content-center align-items-center position-relative" style={{backgroundColor: "#F0F0F0"}}>
                <div className="d-flex justify-content-center align-items-center fs-1 bg-primary rounded-circle text-white" style={{width: "105px", height: "105px"}}>{prop.username[0]}</div>
                <div className="mt-2 fw-semibold fs-6">{prop.username}</div>
                <div className="fw-light" style={{fontSize: "12px"}}>{"Software Developer"}</div>
                <div className="d-flex mt-3 align-items-center w-50 justify-content-evenly">
                    <div className="p-3 rounded-circle" style={{width: "60px", height: "60px", backgroundColor: "#DCE8FF"}} role="button">
                        <img src={Icons.Chat} />
                    </div>
                    <div style={{width: "1px", height: "40px", backgroundColor: "grey"}}></div>
                    <div className="p-3 rounded-circle" style={{width: "60px", height: "60px", backgroundColor: "#DCE8FF"}} role="button">
                        <img src={Icons.VideoCall} />
                    </div>
                </div>
                <button onClick={logoutHandler} className="position-absolute border-0" style={{top: "20px", right: "20px"}}>
                    <img src={Icons.Logout} width="30px"/>
                </button>
            </div>
        </>
    );
}

export default ContactPreview;