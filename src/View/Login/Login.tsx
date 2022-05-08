import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import "./Login.scss";

type FormValues = {
    redNickname: string;
    redAge: number;
    yellowNickname: string;
    yellowAge: number;
};

export default function Login({ SetGameStarted }: any) {

    const navigate = useNavigate()

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<FormValues>({
        defaultValues: {
            redNickname: "",
            yellowNickname: "",
            redAge: undefined,
            yellowAge: undefined
        }
    });

    const onSubmit = handleSubmit((data) => {
        window.sessionStorage.setItem("isGameSessionStarted", "true");
        localStorage.setItem("players", JSON.stringify(data));

        SetGameStarted(true)

        navigate('/gamepage')
    });



    return (
        <>
            <div className="LoginPage">
                <h1 className="loginTitle">Connect 4 Login</h1>
                <form onSubmit={onSubmit}>

                    <div className="FlexWrapper">

                        <div className="WrapItem">
                            <div>
                                <h1>Player <strong style={{ color: "red" }}>RED</strong> Details:</h1>
                                <label>Nickname</label>
                                <input {...register("redNickname", { required: true })} placeholder="Please Enter Your Nickname" />
                                {errors.redNickname && <p>This field is required</p>}
                            </div>

                            <div>
                                <label>Age</label>
                                <input type="number" {...register("redAge", { required: true })} placeholder="Please Enter Your Age" />
                                {errors.redAge && <p>This field is required</p>}
                            </div>

                        </div>

                        <div className="WrapItem">

                            <div>
                                <h1>Player <strong style={{ color: "yellow" }}>YELLOW</strong> Details:</h1>
                                <label>Nickname</label>
                                <input {...register("yellowNickname", { required: true })} placeholder="Please Enter Your Nickname" />
                                {errors.yellowNickname && <p>This field is required</p>}
                            </div>

                            <div>
                                <label>Age</label>
                                <input type="number" {...register("yellowAge", { required: true })} placeholder="Please Enter Your Age" />
                                {errors.yellowAge && <p>This field is required</p>}
                            </div>
                        </div>

                    </div>


                    <div className="SubmitInputItem">
                        <input type="submit" className="submitButton" />
                    </div>

                </form>
            </div>
        </>
    )
}