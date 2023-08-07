import Gstyle from "./../../AppGlobal.module.css";
import { Link, useNavigate } from "react-router-dom";
import { Box, Button, Image, Input, Text, Textarea, VStack } from "@chakra-ui/react";
import heart from "../../assets/heart.svg";
import r_heart from "../../assets/r-heart.svg";
import useGetResponses from "./useGetResponses";
import ResponsesList from "./components/responsesList/responsesList";
import PageLayout from "../../layout/PageLayout/PageLayout";
import { cookie } from "../../utils";
import { useDispatch } from "react-redux";
import Like from "../../repositories/Like";
import { voteAddLike, voteRemoveLike } from "../../redux/features/votationDetailSlice";
import { useState } from "react";
import Response from "../../repositories/Response";

const Msgdetail = () => {
  const userData = cookie.getObject("userData");
  const navigate = useNavigate();
  if (!userData) navigate("/");
  const { _id: user_id } = userData;

  const { data: vote, error, loading, addOrRemoveLike } = useGetResponses();

  const dispatch = useDispatch();
  const handleLike = (vote_id) => {
    Like.sendVoteLike(vote_id).then((res) => {
      const { result } = res.data;
      addOrRemoveLike(user_id);
      if (result === "like") {
        dispatch(voteAddLike({ vote_id, user_id }));
      } else {
        dispatch(voteRemoveLike({ vote_id, user_id }));
      }
    });
  };

  const [commentInp, setCommentInp] = useState("");
  const handleCommentInp = (e) => {
    const { value } = e.target;
    setCommentInp(value);
  };
  const submitComment = ({ receiver_id, body }) => {
    const responseData = {
      vote_id: vote._id,
      receiver_id,
      body,
    };
    Response.send(responseData).then((res) => {
      console.log(res);
    });
  };

  if (error) return <h2>Lo siento hubo un error</h2>;
  if (loading) return <h2>Loading...</h2>;
  return (
    <PageLayout>
      <Box
        sx={{
          padding: "20px",
          backgroundColor: "cadetblue",
          height: "auto",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "start",
          justifyContent: "start",
          borderRadius: "5px",
          gap: "5px",
        }}
      >
        <Box
          sx={{
            padding: "5px",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            minH: "75vh",
          }}
        >
          <Box
            sx={{
              position: "relative",
              width: "100%",
            }}
          >
            <Text width="100%" fontWeight="600">
              {vote?.user_id?.username}
            </Text>
            <Text>{vote?.comment}</Text>
            <Image
              src={vote?.likes.includes(user_id) ? r_heart : heart}
              sx={{
                position: "absolute",
                right: "4px",
                bottom: "4px",
                cursor: "pointer",
              }}
              onClick={() => handleLike(vote?._id)}
            />
          </Box>
          <ResponsesList responsesArray={vote?.responses} />
        </Box>

        <Textarea
          sx={{}}
          placeholder="Agrega un comentario..."
          value={commentInp}
          onChange={handleCommentInp}
        />
        <Button
          sx={{
            alignSelf: "flex-end",
            bgColor: "lightblue",
            _hover: { boxShadow: "2px 2px 3px black" },
            _active: { boxShadow: "inset 2px 2px 3px black" },
          }}
          onClick={() => {
            submitComment({ receiver_id: vote.user_id._id, body: commentInp });
            setCommentInp("");
          }}
        >
          Enviar
        </Button>
      </Box>

      <div style={{ display: "flex", justifyContent: "start" }}>
        <Link className={Gstyle.Link} onClick={() => history.back()}>
          ATRAS
        </Link>
      </div>
    </PageLayout>
  );
};

export default Msgdetail;
