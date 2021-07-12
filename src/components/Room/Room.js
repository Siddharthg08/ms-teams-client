import React from 'react';
import ParticipantStrip from '../ParticipantStrip/ParticipantStrip';
import {styled} from '@material-ui/core/styles';
import MainParticipant from '../MainParticipant/MainParticipant';
import Transcript from "../Transcript/Transcript";
import useSymblContext from "../../hooks/useSymblContext/useSymblContext";
import CircularProgress from "@material-ui/core/CircularProgress";
import ScopedCssBaseline from '@material-ui/core/ScopedCssBaseline';
const Container = styled('div')(({ theme }) => ({
  position: 'relative',
  height: '100%',
  display: 'grid',
  gridTemplateColumns: `${theme.sidebarWidth}px 1fr`,
  gridTemplateAreas: '". participantList transcript"',
  gridTemplateRows: '100%',
  [theme.breakpoints.down('xs')]: {
    gridTemplateAreas: '"participantList" "."',
    gridTemplateColumns: `auto`,
    gridTemplateRows: `calc(100% - ${theme.sidebarMobileHeight + 12}px) ${theme.sidebarMobileHeight + 6}px`,
    gridGap: '6px',
  },
}));

// Here Main Participant is rendering 
export default function Room() {
  const { isStarting } = useSymblContext();
  return (
    // <ScopedCssBaseline>
 <Container>
      { isStarting ? <CircularProgress /> : undefined}
      <ScopedCssBaseline>
      <ParticipantStrip />
      </ScopedCssBaseline>
     
      <MainParticipant />
    </Container>
    // </ScopedCssBaseline>
  );
}
