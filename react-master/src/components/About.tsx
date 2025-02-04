import { Box, Container, Typography, Divider } from "@mui/material";

const About = () => {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        backgroundColor: "#FAF3E0",
        color: "#4E342E",
        padding: 4,
      }}
    >
      <Container maxWidth="md">
        <Typography variant="h2" sx={{ fontWeight: "bold", mb: 2 }}>
          על האתר שלנו 🍽️
        </Typography>
        <Divider sx={{ mb: 3, backgroundColor: "#A1887F" }} />
        <Typography variant="h5" sx={{ mb: 3 }}>
          אתר המתכונים שלנו נוצר מתוך אהבה לבישול ואפייה, ורצון לחלוק מתכונים מדהימים עם העולם.
        </Typography>
        <Typography variant="body1" sx={{ fontSize: "1.2rem", lineHeight: 1.8 }}>
          כאן תוכלו למצוא מגוון רחב של מתכונים, החל ממנות קלות ומהירות ועד מתכונים מושקעים לאירועים מיוחדים.
          כל המתכונים באתר נאספים בקפידה, ואנחנו כל הזמן מוסיפים חדשים!  
          תוכלו גם לשתף את המתכונים האהובים עליכם ולהצטרף לקהילה של אוהבי אוכל אמיתיים.
        </Typography>
        <Typography variant="h6" sx={{ mt: 4, fontStyle: "italic" }}>
          "האוכל הוא לא רק מה שאנו אוכלים, הוא מה שאנו חווים, זוכרים ואוהבים."
        </Typography>
      </Container>
    </Box>
  );
};

export default About;
