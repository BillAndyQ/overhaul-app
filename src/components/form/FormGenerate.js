import FormAutoField from './FormAutoField';
import FormSelectExt from './FormSelectExt';
import FormAutoFieldNum from './FormAutoFieldNum';
import FormAutoSelect from './FormAutoSelect';
import FormAutoDate from "./FormAutoDate"

export default function FormGenerate({ fields }) {
  return (
    <>
      {Object.entries(fields).map(([key, config]) => {
        if (config.type === "text") {
          return <FormAutoField key={key} config={config} />;
        } else if (config.type === "select") {
          return (
            <FormSelectExt
              key={key}
              dataUrl={config.urlData}
              name={config.field}
              labelField={config.label}
              fieldData={config.fieldData}
            />
          );
        }
        else if(config.type == "number"){
          return <FormAutoFieldNum key={key} config={config} />;
        }
        else if(config.type == "select_default"){
          return <FormAutoSelect key={key} config={config}/>
        }
        else if(config.type == "textarea"){
          return <FormAutoField key={key} config={config} />;
        }
        else if(config.type == "date"){
          return <FormAutoDate key={key} config={config} />;
        }
        
        return null;
      })}
    </>
  );
}
