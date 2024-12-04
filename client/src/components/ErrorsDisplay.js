const ErrorsDisplay = ({ errors }) => {
  let erroresDisplay = null;
  if (errors.length) {
    erroresDisplay = (
      <div className="validation--errors">
        <h2>Errores de validación</h2>
        <div>
          <ul>
            {errors.map((error, i) => (
              <li key={i}>{error}</li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
  return erroresDisplay;

};

export default ErrorsDisplay;
