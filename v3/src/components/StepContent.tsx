// A simple wrapper component that carries header, footer, and children
// StepLayout will extract these parts and render them in the proper layout structure
interface StepContentProps {
  header: React.ReactNode;
  footer: React.ReactNode;
  children: React.ReactNode;
}

export default function StepContent({ header, footer, children }: StepContentProps) {
  // This component just passes through - the actual rendering happens in StepLayout
  // We return a fragment with a special marker that StepLayout can detect
  return (
    <>
      {header}
      {children}
      {footer}
    </>
  );
}
