"use client";

import React, { useState } from "react";
import { NeoToggle } from "@/components/ui/neo-toggle";

/**
 * NeoToggle Component Demo
 * Shows all variants, sizes, and features
 */
export function NeoToggleDemosection() {
  const [primaryOn, setPrimaryOn] = useState(false);
  const [goldOn, setGoldOn] = useState(false);
  const [successOn, setSuccessOn] = useState(false);

  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [premium, setPremium] = useState(false);

  return (
    <div className="space-y-12 p-8">
      {/* Header */}
      <div>
        <h1 className="text-h1 mb-2">NeoToggle Component</h1>
        <p className="text-body text-gray-500">
          Accessible toggle switch with smooth neomorphic animations, three
          variants, and three sizes.
        </p>
      </div>

      {/* Size Variants */}
      <section>
        <h2 className="text-h2 mb-4">Size Variants</h2>
        <div className="flex flex-wrap gap-8 p-4 bg-gray-50 rounded-lg">
          <div>
            <p className="text-body-small mb-2 text-gray-600">Small</p>
            <NeoToggle
              checked={primaryOn}
              onChange={setPrimaryOn}
              size="sm"
              variant="primary"
            />
          </div>
          <div>
            <p className="text-body-small mb-2 text-gray-600">
              Medium (default)
            </p>
            <NeoToggle
              checked={primaryOn}
              onChange={setPrimaryOn}
              size="md"
              variant="primary"
            />
          </div>
          <div>
            <p className="text-body-small mb-2 text-gray-600">Large</p>
            <NeoToggle
              checked={primaryOn}
              onChange={setPrimaryOn}
              size="lg"
              variant="primary"
            />
          </div>
        </div>
      </section>

      {/* Color Variants */}
      <section>
        <h2 className="text-h2 mb-4">Color Variants</h2>
        <div className="space-y-6 p-4 bg-gray-50 rounded-lg">
          {/* Primary */}
          <div className="flex items-center gap-4">
            <div className="w-32">
              <p className="text-body font-semibold">Primary</p>
              <p className="text-body-small text-gray-500">(Charcoal)</p>
            </div>
            <div className="flex gap-4">
              <div>
                <p className="text-caption mb-1 text-gray-500">OFF</p>
                <NeoToggle
                  checked={false}
                  onChange={() => {}}
                  variant="primary"
                  size="md"
                />
              </div>
              <div>
                <p className="text-caption mb-1 text-gray-500">ON</p>
                <NeoToggle
                  checked={true}
                  onChange={() => {}}
                  variant="primary"
                  size="md"
                />
              </div>
            </div>
          </div>

          {/* Gold */}
          <div className="flex items-center gap-4">
            <div className="w-32">
              <p className="text-body font-semibold">Gold</p>
              <p className="text-body-small text-gray-500">(Premium)</p>
            </div>
            <div className="flex gap-4">
              <div>
                <p className="text-caption mb-1 text-gray-500">OFF</p>
                <NeoToggle
                  checked={false}
                  onChange={() => {}}
                  variant="gold"
                  size="md"
                />
              </div>
              <div>
                <p className="text-caption mb-1 text-gray-500">ON</p>
                <NeoToggle
                  checked={true}
                  onChange={() => {}}
                  variant="gold"
                  size="md"
                />
              </div>
            </div>
          </div>

          {/* Success */}
          <div className="flex items-center gap-4">
            <div className="w-32">
              <p className="text-body font-semibold">Success</p>
              <p className="text-body-small text-gray-500">(Green)</p>
            </div>
            <div className="flex gap-4">
              <div>
                <p className="text-caption mb-1 text-gray-500">OFF</p>
                <NeoToggle
                  checked={false}
                  onChange={() => {}}
                  variant="success"
                  size="md"
                />
              </div>
              <div>
                <p className="text-caption mb-1 text-gray-500">ON</p>
                <NeoToggle
                  checked={true}
                  onChange={() => {}}
                  variant="success"
                  size="md"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* With Labels */}
      <section>
        <h2 className="text-h2 mb-4">With Labels</h2>
        <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center justify-between">
            <NeoToggle
              checked={darkMode}
              onChange={setDarkMode}
              label="Dark Mode"
              labelPosition="right"
              variant="primary"
              size="md"
            />
          </div>
          <div className="flex items-center justify-between">
            <NeoToggle
              checked={notifications}
              onChange={setNotifications}
              label="Enable Notifications"
              labelPosition="right"
              variant="success"
              size="md"
            />
          </div>
          <div className="flex items-center justify-between">
            <NeoToggle
              checked={premium}
              onChange={setPremium}
              label="Premium Features"
              labelPosition="right"
              variant="gold"
              size="md"
            />
          </div>
        </div>
      </section>

      {/* Label Positioning */}
      <section>
        <h2 className="text-h2 mb-4">Label Positioning</h2>
        <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center gap-6">
            <div>
              <p className="text-body-small mb-2 text-gray-600">
                Label on Right
              </p>
              <NeoToggle
                checked={true}
                onChange={() => {}}
                label="Right"
                labelPosition="right"
                variant="gold"
              />
            </div>
            <div>
              <p className="text-body-small mb-2 text-gray-600">
                Label on Left
              </p>
              <NeoToggle
                checked={true}
                onChange={() => {}}
                label="Left"
                labelPosition="left"
                variant="gold"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Disabled State */}
      <section>
        <h2 className="text-h2 mb-4">Disabled State</h2>
        <div className="flex flex-wrap gap-8 p-4 bg-gray-50 rounded-lg">
          <div>
            <p className="text-body-small mb-2 text-gray-600">Disabled (OFF)</p>
            <NeoToggle
              checked={false}
              onChange={() => {}}
              disabled
              variant="primary"
              size="md"
            />
          </div>
          <div>
            <p className="text-body-small mb-2 text-gray-600">Disabled (ON)</p>
            <NeoToggle
              checked={true}
              onChange={() => {}}
              disabled
              variant="gold"
              size="md"
            />
          </div>
          <div>
            <p className="text-body-small mb-2 text-gray-600">
              Disabled with Label
            </p>
            <NeoToggle
              checked={false}
              onChange={() => {}}
              disabled
              label="Disabled"
              variant="success"
              size="md"
            />
          </div>
        </div>
      </section>

      {/* Accessibility Info */}
      <section className="p-4 bg-blue-50 rounded-lg border border-blue-200">
        <h3 className="text-h3 mb-2">Accessibility Features</h3>
        <ul className="space-y-2 text-body-small">
          <li>
            <strong>ARIA Attributes:</strong> role=&quot;switch&quot;,
            aria-checked, aria-label
          </li>
          <li>
            <strong>Keyboard Support:</strong> Space and Enter keys to toggle
          </li>
          <li>
            <strong>Focus Management:</strong> Full keyboard navigation with
            visible focus states
          </li>
          <li>
            <strong>Label Support:</strong> Semantic label elements that toggle
            on click
          </li>
          <li>
            <strong>Disabled State:</strong> Proper disabled handling with
            visual feedback
          </li>
        </ul>
      </section>

      {/* Animation Info */}
      <section className="p-4 bg-green-50 rounded-lg border border-green-200">
        <h3 className="text-h3 mb-2">Animation & Visual Effects</h3>
        <ul className="space-y-2 text-body-small">
          <li>
            <strong>Smooth Transitions:</strong> 300ms CSS transitions for all
            changes
          </li>
          <li>
            <strong>Shadow System:</strong> Neomorphic shadows that change on
            state
          </li>
          <li>
            <strong>Glow Effects:</strong> Gold and Success variants have glow
            shadows
          </li>
          <li>
            <strong>Hover States:</strong> Enhanced shadows on hover for
            interactivity feedback
          </li>
          <li>
            <strong>Active States:</strong> Pressed shadow effect on click
          </li>
        </ul>
      </section>

      {/* Component States Display */}
      <section className="p-4 bg-purple-50 rounded-lg border border-purple-200">
        <h3 className="text-h3 mb-2">Current Component States</h3>
        <div className="grid grid-cols-2 gap-4 text-body-small font-mono">
          <div>
            <p className="text-gray-600">Dark Mode:</p>
            <p className="font-semibold">{darkMode ? "ON" : "OFF"}</p>
          </div>
          <div>
            <p className="text-gray-600">Notifications:</p>
            <p className="font-semibold">{notifications ? "ON" : "OFF"}</p>
          </div>
          <div>
            <p className="text-gray-600">Premium:</p>
            <p className="font-semibold">{premium ? "ON" : "OFF"}</p>
          </div>
        </div>
      </section>
    </div>
  );
}
