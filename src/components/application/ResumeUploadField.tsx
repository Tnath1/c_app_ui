import { useEffect, useRef } from "react";
import { MAX_RESUME_SIZE_BYTES } from "@/lib/validation/application-schema";
import { FieldError, FieldLabel } from "@/components/ui";
import type { ResumeAttachment } from "@/types/application";
import type { ApplicationFormController } from "./application-form-types";

type ResumeUploadFieldProps = {
  form: ApplicationFormController;
};

function formatFileSize(size: number) {
  return `${(size / 1024 / 1024).toFixed(2)} MB`;
}

function readFileAsDataUrl(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();

    reader.addEventListener("load", () => {
      if (typeof reader.result === "string") {
        resolve(reader.result);
        return;
      }

      reject(new Error("Resume could not be read."));
    });

    reader.addEventListener("error", () => {
      reject(new Error("Resume could not be read."));
    });

    reader.readAsDataURL(file);
  });
}

function getBase64FromDataUrl(dataUrl: string) {
  return dataUrl.split(",")[1] || "";
}

function isPdf(file: File) {
  return file.type === "application/pdf" || file.name.toLowerCase().endsWith(".pdf");
}

export function ResumeUploadField({ form }: ResumeUploadFieldProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const resume = form.watch("resume");
  const errorMessage = form.formState.errors.resume?.message;
  const error = typeof errorMessage === "string" ? errorMessage : undefined;
  const errorId = error ? "resume-error" : undefined;
  const helperId = "resume-helper";

  useEffect(() => {
    if (!resume && inputRef.current) {
      inputRef.current.value = "";
    }
  }, [resume]);

  async function handleFileChange(
    fileList: FileList | null,
    input: HTMLInputElement,
  ) {
    const file = fileList?.[0];

    if (!file) {
      form.setValue("resume", undefined, {
        shouldDirty: true,
        shouldValidate: true,
      });
      return;
    }

    if (!isPdf(file)) {
      form.setValue("resume", undefined, {
        shouldDirty: true,
        shouldValidate: true,
      });
      input.value = "";
      form.setError("resume", {
        message: "Upload a PDF file.",
        type: "validate",
      });
      return;
    }

    if (file.size > MAX_RESUME_SIZE_BYTES) {
      form.setValue("resume", undefined, {
        shouldDirty: true,
        shouldValidate: true,
      });
      input.value = "";
      form.setError("resume", {
        message: "Keep your resume under 4MB.",
        type: "validate",
      });
      return;
    }

    try {
      const dataUrl = await readFileAsDataUrl(file);
      const attachment: ResumeAttachment = {
        base64: getBase64FromDataUrl(dataUrl),
        fileName: file.name,
        fileSize: file.size,
        fileType: "application/pdf",
      };

      form.setValue("resume", attachment, {
        shouldDirty: true,
        shouldValidate: true,
      });
      form.clearErrors("resume");
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Resume could not be read.";

      input.value = "";
      form.setError("resume", {
        message,
        type: "validate",
      });
    }
  }

  return (
    <div>
      <FieldLabel htmlFor="resume" isRequired label="Resume PDF" />
      <input
        accept="application/pdf,.pdf"
        aria-describedby={`${helperId}${errorId ? ` ${errorId}` : ""}`}
        aria-invalid={error ? "true" : "false"}
        aria-required="true"
        className="block w-full rounded-md border border-stone-300 bg-white px-3.5 py-2.5 text-base text-stone-950 shadow-sm outline-none transition-colors file:mr-3 file:rounded-md file:border-0 file:bg-stone-950 file:px-3 file:py-1.5 file:text-sm file:font-medium file:text-white hover:border-stone-400 focus:border-stone-900 focus:ring-2 focus:ring-stone-900/10 dark:border-stone-700 dark:bg-stone-950 dark:text-stone-50 dark:file:bg-stone-100 dark:file:text-stone-950 dark:hover:border-stone-600 dark:focus:border-stone-100 dark:focus:ring-stone-100/10"
        id="resume"
        onChange={(event) => {
          void handleFileChange(event.currentTarget.files, event.currentTarget);
        }}
        ref={inputRef}
        type="file"
      />
      <p className="mt-1.5 text-sm text-stone-500 dark:text-stone-400" id={helperId}>
        PDF only, up to 4MB.
      </p>
      {resume ? (
        <p className="mt-1.5 text-sm text-stone-600 dark:text-stone-300">
          Selected: {resume.fileName} ({formatFileSize(resume.fileSize)})
        </p>
      ) : null}
      <FieldError id={errorId}>{error}</FieldError>
    </div>
  );
}
