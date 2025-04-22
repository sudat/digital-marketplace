import {
  Body,
  Button,
  Container,
  Head,
  Html,
  Preview,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";

export default function ProductEmail({ link }: { link: string }) {
  return (
    <Html>
      <Head />
      <Preview>Your Product is here ... </Preview>
      <Tailwind>
        <Body className="bg-white font-sans">
          <Container style={container}>
            <Text className="text-2xl font-semibold">Hi Friend,</Text>
            <Text className="text-lg text-gray-600 ">
              Thank you for buying our product. We're excited to have you on
              board.
            </Text>
            <Section className="w-full flex justify-center mt-7">
              <Button
                className="text-white bg-blue-500 rounded-lg px-10 py-4"
                href={link}
              >
                Your Download Link
              </Button>
            </Section>
            <Text className="text-gray-600 text-lg">
              Best,
              <br />
              The Product Team
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
const container = {
  margin: "0 auto",
  padding: "20px 0 48px",
};
