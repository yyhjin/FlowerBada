import { useTheme } from '@mui/material/styles';
import MobileStepper from '@mui/material/MobileStepper';
import Button from '@mui/material/Button';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';

export default function DotSlice({
  paginationId,
  setPaginationId,
  stepNumber,
}: any) {
  const theme = useTheme();

  const handleNext = () => {
    setPaginationId(paginationId + 1);
  };

  const handleBack = () => {
    setPaginationId(paginationId - 1);
  };

  return (
    <>
      {paginationId ? (
        <MobileStepper
          variant="dots"
          steps={stepNumber}
          position="static"
          activeStep={paginationId - 1}
          sx={{ maxWidth: 500, flexGrow: 1 }}
          style={{ backgroundColor: 'transparent' }}
          nextButton={
            <Button
              size="small"
              onClick={handleNext}
              disabled={paginationId === stepNumber}
            >
              {theme.direction === 'rtl' ? (
                <KeyboardArrowLeft />
              ) : (
                <KeyboardArrowRight />
              )}
            </Button>
          }
          backButton={
            <Button
              size="small"
              onClick={handleBack}
              disabled={paginationId === 1}
            >
              {theme.direction === 'rtl' ? (
                <KeyboardArrowRight />
              ) : (
                <KeyboardArrowLeft />
              )}
            </Button>
          }
        />
      ) : (
        <div></div>
      )}
    </>
  );
}
