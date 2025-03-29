
import { useState } from "react";
import { Upload, File, X, CheckCircle, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";

interface FileUploaderProps {
  onUploadComplete?: (data: any) => void;
}

const FileUploader = ({ onUploadComplete }: FileUploaderProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [uploaded, setUploaded] = useState(false);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      
      // Check file type
      const validTypes = [
        'application/vnd.ms-excel',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'text/csv',
        'application/json'
      ];
      
      if (!validTypes.includes(selectedFile.type)) {
        setError('Please upload a valid Excel, CSV, or JSON file');
        return;
      }
      
      // Check file size (10MB max)
      if (selectedFile.size > 10 * 1024 * 1024) {
        setError('File size should be less than 10MB');
        return;
      }
      
      setFile(selectedFile);
      setError(null);
      setUploaded(false);
    }
  };

  const handleUpload = () => {
    if (!file) return;
    
    setUploading(true);
    setUploadProgress(0);
    
    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 5;
      });
    }, 100);
    
    // Simulate upload completion
    setTimeout(() => {
      clearInterval(interval);
      setUploading(false);
      setUploaded(true);
      setUploadProgress(100);
      
      // Mock data parsing
      if (onUploadComplete) {
        // In a real app, we would parse the actual file
        onUploadComplete({
          rowCount: Math.floor(Math.random() * 5000) + 1000,
          status: 'success',
          fileName: file.name
        });
      }
      
      toast.success(`File "${file.name}" uploaded and processed successfully!`);
    }, 2000);
  };

  const clearFile = () => {
    setFile(null);
    setError(null);
    setUploaded(false);
    setUploadProgress(0);
  };

  return (
    <div className="border-2 border-dashed border-border rounded-lg p-6">
      {!file ? (
        <div className="text-center">
          <Upload className="h-10 w-10 mx-auto mb-4 text-muted-foreground" />
          <h3 className="text-lg font-medium mb-2">Upload Data File</h3>
          <p className="text-muted-foreground text-sm mb-4">
            Drag and drop your Excel or CSV file here, or click to browse
          </p>
          <input
            type="file"
            id="file-upload"
            onChange={handleFileSelect}
            className="hidden"
            accept=".xlsx,.xls,.csv,.json"
          />
          <Button 
            variant="outline" 
            onClick={() => document.getElementById('file-upload')?.click()}
            className="mx-auto"
          >
            Browse Files
          </Button>
          <p className="text-xs text-muted-foreground mt-4">
            Supported formats: XLSX, XLS, CSV, JSON (max 10MB)
          </p>
        </div>
      ) : (
        <div>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <div className="bg-primary/10 p-2 rounded mr-3">
                <File className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h4 className="font-medium text-sm truncate max-w-[200px]">
                  {file.name}
                </h4>
                <p className="text-xs text-muted-foreground">
                  {(file.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
            </div>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={clearFile}
              disabled={uploading}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          
          {error && (
            <div className="bg-destructive/10 p-3 rounded-md mb-4 flex items-center">
              <AlertCircle className="h-4 w-4 text-destructive mr-2" />
              <p className="text-sm text-destructive">{error}</p>
            </div>
          )}
          
          {uploading && (
            <div className="mb-4">
              <Progress value={uploadProgress} className="h-2 mb-2" />
              <p className="text-xs text-muted-foreground">
                Uploading... {uploadProgress}%
              </p>
            </div>
          )}
          
          {uploaded && (
            <div className="bg-emerald-50 dark:bg-emerald-950/20 p-3 rounded-md mb-4 flex items-center">
              <CheckCircle className="h-4 w-4 text-dashboard-emerald mr-2" />
              <p className="text-sm text-dashboard-emerald">
                File uploaded successfully
              </p>
            </div>
          )}
          
          {!uploading && !uploaded && !error && (
            <Button 
              onClick={handleUpload} 
              className="w-full"
            >
              Upload and Process
            </Button>
          )}
          
          {uploaded && (
            <Button 
              variant="outline" 
              onClick={clearFile} 
              className="w-full"
            >
              Upload Another File
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default FileUploader;
