"use client";

import { useState } from "react";
import {
  Share,
  Copy,
  X,
  Link,
} from "lucide-react";
import {
  FaFacebook,
  FaTwitter,
  FaLinkedinIn,
  FaEnvelope,
  FaWhatsapp
} from "react-icons/fa";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

// Modern sharing API utility
const useWebShare = () => {
  const [canShare, setCanShare] = useState(
    typeof navigator !== "undefined" && !!navigator.share
  );

  const share = async ({ title, text, url }) => {
    if (!canShare) return false;

    try {
      await navigator.share({ title, text, url });
      return true;
    } catch (error) {
      if (error.name !== "AbortError") {
        console.error("Error sharing:", error);
        setCanShare(false);
      }
      return false;
    }
  };

  return { canShare, share };
};

export default function ShareDialog({ portfolioId, theme }) {
  const [open, setOpen] = useState(false);
  const { canShare, share } = useWebShare();

  const baseUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}/portfolio/${portfolioId}`
      : "";
  const shareUrl = `${baseUrl}?utm_source=share_dialog&utm_medium=button&utm_campaign=portfolio_share`;
  const shareTitle = "Check out my portfolio!";
  const shareText = "I'd love to get your feedback on my work!";

  const socialLinks = [
    {
      name: "WhatsApp",
      url: `https://wa.me/?text=${encodeURIComponent(`${shareTitle} ${shareUrl}`)}`,
      icon: <FaWhatsapp className="mr-2 h-4 w-4" />,
    },
    {
      name: "Facebook",
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
      icon: <FaFacebook className="mr-2 h-4 w-4" />,
    },
    {
      name: "Twitter",
      url: `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareTitle)}`,
      icon: <FaTwitter className="mr-2 h-4 w-4" />,
    },
    {
      name: "LinkedIn",
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
      icon: <FaLinkedinIn className="mr-2 h-4 w-4" />,
    },
    {
      name: "Email",
      url: `mailto:?subject=${encodeURIComponent(shareTitle)}&body=${encodeURIComponent(`${shareText} ${shareUrl}`)}`,
      icon: <FaEnvelope className="mr-2 h-4 w-4" />,
    },
  ];

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      toast.success("Link copied to clipboard!");
    } catch (err) {
      console.error("Failed to copy link:", err);
      toast.error("Failed to copy link");
    }
  };

  const handleNativeShare = async () => {
    const shared = await share({
      title: shareTitle,
      text: shareText,
      url: shareUrl,
    });

    if (shared) {
      setOpen(false);
    }
  };

  // Button styles
  const buttonStyle = {
    backgroundColor: theme.primary,
    color: theme.light,
    fontFamily: theme.fontBody,
  };

  const secondaryButtonStyle = {
    backgroundColor: theme.secondary,
    color: theme.light,
    fontFamily: theme.fontBody,
  };

  const outlineButtonStyle = {
    borderColor: theme.primary,
    color: theme.primary,
    backgroundColor: "transparent",
    fontFamily: theme.fontBody,
  };

  const socialButtonStyle = {
    backgroundColor: theme.accent,
    color: theme.dark,
    fontFamily: theme.fontBody,
    border: "none",
  };

  const closeButtonStyle = {
    backgroundColor: theme.muted,
    color: theme.body,
    fontFamily: theme.fontBody,
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button style={buttonStyle}>
          <Share className="mr-2 h-4 w-4" />
          Share
        </Button>
      </DialogTrigger>

      <DialogContent
        className="sm:max-w-md"
        style={{
          backgroundColor: theme.card,
          color: theme.body,
          fontFamily: theme.fontBody,
          border: `1px solid ${theme.muted}`,
        }}
      >
        <DialogHeader>
          <DialogTitle
            style={{ fontFamily: theme.fontHeading, color: theme.dark }}
          >
            Share Portfolio
          </DialogTitle>
          <DialogDescription style={{ color: theme.body }}>
            Share your portfolio on social media or copy the link below.
          </DialogDescription>
        </DialogHeader>

        <div className="flex items-center space-x-2 my-4">
          <div className="grid flex-1 gap-2">
            <Input
              readOnly
              value={shareUrl}
              className="w-full"
              style={{
                backgroundColor: theme.background,
                borderColor: theme.muted,
                color: theme.body,
                fontFamily: theme.fontBody,
              }}
            />
          </div>
          <Button
            size="sm"
            style={outlineButtonStyle}
            onClick={handleCopy}
            title="Copy to clipboard"
          >
            <span className="sr-only">Copy</span>
            <Copy className="h-4 w-4" />
          </Button>
        </div>

        {canShare && (
          <Button
            onClick={handleNativeShare}
            className="w-full my-2"
            style={secondaryButtonStyle}
          >
            <Link className="mr-2 h-4 w-4" />
            Share using device options
          </Button>
        )}

        <div className="grid grid-cols-2 gap-2 my-4">
          {socialLinks.map((social) => (
            <Button
              key={social.name}
              onClick={() =>
                window.open(social.url, "_blank", "noreferrer,noopener")
              }
              className="w-full cursor-pointer hover:scale-102 transition-all"
              style={socialButtonStyle}
            >
              {social.icon}
              {social.name}
            </Button>
          ))}
        </div>

        <DialogFooter className="sm:justify-end mt-4">
          <Button 
            onClick={() => setOpen(false)}
            style={closeButtonStyle}
          >
            <X className="mr-2 h-4 w-4" />
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}