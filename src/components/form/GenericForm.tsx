// GenericForm.tsx
import React from 'react';
import {
	useForm,
	FormProvider,
	SubmitHandler,
	UseFormProps,
	FieldValues,
} from 'react-hook-form';

interface GenericFormInterface<TFormData extends FieldValues> {
	children: React.ReactNode;
	formOptions?: UseFormProps<TFormData>;
}

const GenericForm = <TFormData extends FieldValues>({
	children,
	formOptions,
}: GenericFormInterface<TFormData>) => {
	const methods = useForm<TFormData>(formOptions);

	return <FormProvider {...methods}>{children}</FormProvider>;
};

export default GenericForm;
