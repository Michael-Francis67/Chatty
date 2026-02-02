import {
    CallingState,
    StreamCall,
    StreamVideo,
    StreamVideoClient,
    useCall,
    useCallStateHooks,
    type User,
} from "@stream-io/video-react-sdk";

const apiKey = "mmhfdzb5evj2";
const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJodHRwczovL3Byb250by5nZXRzdHJlYW0uaW8iLCJzdWIiOiJ1c2VyL0hhaWxfUHJvdGVzdCIsInVzZXJfaWQiOiJIYWlsX1Byb3Rlc3QiLCJ2YWxpZGl0eV9pbl9zZWNvbmRzIjo2MDQ4MDAsImlhdCI6MTc3MDA1NTcyNSwiZXhwIjoxNzcwNjYwNTI1fQ.AKx2xqB0oqJhcG9kSJCZUCmFAaVu78tCstQfJNqD5Ek";
const userId = "Hail_Protest";
const callId = "IMuiYr0LtdhVJvFC0llYj";

// set up the user object
const user: User = {
    id: userId,
    name: "Oliver",
    image: "https://getstream.io/random_svg/?id=oliver&name=Oliver",
};

const client = new StreamVideoClient({apiKey, user, token});
const call = client.call("default", callId);
await call.join({create: true});

export default function HomePage() {
    return (
        <StreamVideo client={client}>
            <StreamCall call={call}>
                <MyUILayout />
            </StreamCall>
        </StreamVideo>
    );
}

export const MyUILayout = () => {
    const call = useCall();

    const {useCallCallingState, useParticipantCount} = useCallStateHooks();
    const callingState = useCallCallingState();
    const participantCount = useParticipantCount();

    if (callingState !== CallingState.JOINED) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            Call "{call?.id}" has {participantCount} participants
        </div>
    );
};
