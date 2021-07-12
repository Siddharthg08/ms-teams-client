import React, {useEffect, useState} from 'react';
import {styled} from '@material-ui/core/styles';
import useHeight from './hooks/useHeight/useHeight';
import {useParams} from 'react-router-dom';
import './App.css';
import LocalVideoPreview from "./components/LocalVideoPreview/LocalVideoPreview";
import Room from "./components/Room/Room";
import useRoomState from "./hooks/useRoomState/useRoomState";
import {useAppState} from "./state";
import useVideoContext from "./hooks/useVideoContext/useVideoContext";
import MenuBar from "./components/MenuBar/MenuBar";
import ClosedCaptions from "./components/ClosedCaptions/ClosedCaptions";
import {SymblProvider} from "./components/SymblProvider";
import Controls from "./components/Controls/Controls";
import ScopedCssBaseline from '@material-ui/core/ScopedCssBaseline';
import Transcript from './components/Transcript/Transcript';

//This page is rendering all components like main video, chat, captions, controls

const Container = styled('div')({
    display: 'grid',
    gridTemplateRows: 'auto 1fr',
});

const Main = styled('main')({
    overflow: 'hidden',
});

function App() {
    const {roomState, room} = useRoomState();
    const height = useHeight();
    let {URLRoomName, UserName} = useParams();
    const [roomName, setRoomName] = useState(URLRoomName);
    const [userName, setUserName] = useState(UserName);
    const {getToken} = useAppState();
    const {connect} = useVideoContext();

    const [hasStarted, setHasStarted] = useState(false);
    const [isStarting, setIsStarting] = useState(false);

    const [showChat, setShowChat] = useState(false);
    const [showCaptions, setShowCaptions] = useState(false);

    //If user is disconnected
    useEffect(() => {
        if (roomState === 'disconnected' && !hasStarted && !isStarting) {
            if (!(roomName && userName) && (room && room.name && room.localParticipant && room.localParticipant.identity)) {
                !roomName && setRoomName(room.name);
                !userName && setUserName(room.localParticipant.identity);
            }//To connect with symnl and Twilio tokens
            if (roomName && userName) {
                setIsStarting(true)
                getToken(userName, roomName).then(token => {
                    connect(token)
                    setIsStarting(false);
                    setHasStarted(true);
                });
            }
        }
    }, [roomName, userName, room]);


    return (
        <>
        {/* <ScopedCssBaseline> */}
        <Container style={{height}}>
            <MenuBar/>
            <Main>
                {roomState === 'disconnected' ? <LocalVideoPreview/> : (
                    <SymblProvider roomName={roomName}>
                    <Room/> 
                    {/* Room includes main participant and local participant */}
                        {/* <ClosedCaptions /> */}
                            {/* Controls are all the buttons like mute unmute */}
                        <Controls onChangeShowChat={(showChat) => { setShowChat(showChat)}}
                                  onChangeShowCaptions={(showCaptions)=> {setShowCaptions(showCaptions)}}
                        />
                        { showChat ? <Transcript height={"100%"}/> : null }
                        {showCaptions ? <ClosedCaptions/> : null}
                    </SymblProvider>
                )}
            </Main>
        </Container>
    {/* </ScopedCssBaseline> */}
  
    </>
    );
}

export default App;
