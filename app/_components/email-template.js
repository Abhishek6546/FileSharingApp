import * as React from 'react';

import {
  Body,
  Button,
  Container,
  Column,
  Head,
  Heading,
  Html,
  Img,
  Preview,
  Row,
  Section,
  Text,
} from "@react-email/components";

// export const EmailTemplate = ({
//   response,
// }) => (
//   <div>
//     <h1>Welcome,!</h1>
//   </div>
// );

export const EmailTemplate = ({ response, }) => (
  <Html>
    <Head />
    <Preview>File Shared With You</Preview>
    <Body style={main}>
      <Container>
      

        <Section style={content}>
          <Row>
            <Img
              style={image}
              width={620}
              src={`https://firebasestorage.googleapis.com/v0/b/file-sharing-286ab.appspot.com/o/file-upload%2FScreenshot%202024-06-26%20121504.png?alt=media&token=23bc8244-fb43-4e41-bed9-9315a0771fc9`}
            />
          </Row>

          <Row style={{ ...boxInfos, paddingBottom: "0" }}>
            <Column>
              <Heading
                style={{
                  fontSize: 32,
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                Hi {response?.emailToSend.split("@")[0]},
              </Heading>
              <Heading
                as="h2"
                style={{
                  fontSize: 26,
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
               Someone Share file with you
              </Heading>

              <Text style={paragraph}>
                <b>File Name: {response.fileName}</b>
              </Text>
              <Text style={{ ...paragraph, marginTop: -5 }}>
                <b>File Size: {response.fileSize}</b>
              </Text>
              <Text style={{ ...paragraph, marginTop: -5 }}>
                <b>File Type: {response.fileType}</b>
              </Text>
             
              <Text
                style={{
                  color: "rgb(0,0,0, 0.5)",
                  fontSize: 14,
                  marginTop: -5,
                }}
              >
               *Access and Download File on your own risk
              </Text>

              <Text style={paragraph}>
                If this was you, there's nothing else you need to do.
              </Text>
              <Text style={{ ...paragraph, marginTop: -5 }}>
                Click Below Button to Access your File
              </Text>
            </Column>
          </Row>
          <Row style={{ ...boxInfos, paddingTop: "0" }}>
            <Column style={containerButton} colSpan={2}>
              <Button href={response?.shortUrl} style={button}>Click here to download</Button>
            </Column>
          </Row>
        </Section>

        {/* <Section style={containerImageFooter}>
          <Img
            style={image}
            width={620}
            src={`${baseUrl}/static/footer.png`}
          />
        </Section> */}

        <Text
          style={{
            textAlign: "center",
            fontSize: 12,
            color: "rgb(0,0,0, 0.7)",
          }}
        >
          © 2024 | Abhishek @2024 Copyrights, Punjab, India | www.Abhishek.com
        </Text>
      </Container>
    </Body>
  </Html>
);

const main = {
  backgroundColor: "#fff",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const paragraph = {
  fontSize: 16,
};

const logo = {
  padding: "30px 20px",
};

const containerButton = {
  display: "flex",
  justifyContent: "center",
  width: "100%",
};

const button = {
  backgroundColor: "#e00707",
  borderRadius: 3,
  color: "#FFF",
  fontWeight: "bold",
  border: "1px solid rgb(0,0,0, 0.1)",
  cursor: "pointer",
  padding: "12px 30px",
};

const content = {
  border: "1px solid rgb(0,0,0, 0.1)",
  borderRadius: "3px",
  overflow: "hidden",
};

const image = {
  maxWidth: "100%",
};

const boxInfos = {
  padding: "20px",
};

const containerImageFooter = {
  padding: "45px 0 0 0",
};

